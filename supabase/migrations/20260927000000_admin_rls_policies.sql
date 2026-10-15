-- Migration: Add Admin RLS Policies for Content Tables
-- Description: Grants users with the 'admin' role full CRUD access to news, blogs, and signals.

CREATE POLICY "Admin can insert news" ON public.news FOR INSERT WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admin can update news" ON public.news FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admin can delete news" ON public.news FOR DELETE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin can insert blogs" ON public.blogs FOR INSERT WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admin can update blogs" ON public.blogs FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admin can delete blogs" ON public.blogs FOR DELETE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin can insert signals" ON public.signals FOR INSERT WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admin can update signals" ON public.signals FOR UPDATE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admin can delete signals" ON public.signals FOR DELETE USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');
