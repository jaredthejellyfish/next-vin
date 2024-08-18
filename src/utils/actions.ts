'use server'
 
import { redirect } from 'next/navigation'
 
export async function resultsForVin(data: FormData) {
  redirect(`/results/${data.get('vin')}`)
}