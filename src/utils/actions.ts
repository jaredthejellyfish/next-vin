'use server'
 
import { redirect } from 'next/navigation'
 
export async function resultsForVin(data: FormData) {
  redirect(`/results/${data.get('vin')}`)
}

export async function contactEmailSubit(data: FormData) {
  console.log('Email submitted:', data)

  redirect('/contact/success')
}