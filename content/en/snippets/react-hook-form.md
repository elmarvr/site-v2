---
title: React hook form
summary: Simple snippet showing the difference between Typescript and Javascript
date: 2024-02-07
---

This is a snippet i use in all my React projects. A wrapper for the react-hook-form useForm hook that takes in a schema to make it type-safe and it returns a FormField component that removes the need for having to add the control prop to the FormField component.

::code-group

<<< ./content/code/react-hook-form/address-form.tsx [address-form]
<<< ./content/code/react-hook-form/use-form.tsx [use-form]
<<< ./content/code/react-hook-form/form-field.tsx [form-field]

::
