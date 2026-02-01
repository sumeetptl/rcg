import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Robust middleware session handler for Vercel / Edge Runtime.
 *
 * IMPORTANT FOR DEPLOYMENT: 
 * 1. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY 
 *    are set in your Vercel Environment Variables.
 * 2. Database lookups (like checking user roles) should be done in 
 *    Layouts or Server Components, NOT in middleware, to avoid timeouts
 *    and "MIDDLEWARE_INVOCATION_FAILED" errors.
 */
export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Prevent crash if environment variables are not yet configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Middleware: Supabase environment variables are missing.')
      return supabaseResponse
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            )
          },
        },
      },
    )

    // Check user session
    // This will refresh the session if needed (via setAll above)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // 1. Protected routes - require authentication
    // Note: Admin role check is handled in /app/admin/layout.tsx to improve performance
    const protectedPaths = ['/dashboard', '/admin']
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

    if (isProtectedPath && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // 2. Redirect logged-in users away from auth pages
    const authPaths = ['/auth/login', '/auth/sign-up']
    const isAuthPath = authPaths.some(path => pathname === path)

    if (isAuthPath && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    // Fail safe: If middleware crashes, allow request to proceed but log the error.
    // This prevents the 500 MIDDLEWARE_INVOCATION_FAILED on Vercel.
    console.error('CRITICAL: Middleware Invocation Error', error)
    return NextResponse.next({
      request,
    })
  }
}
