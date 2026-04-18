import { NextResponse } from 'next/server'
import { updateNewsArticle, deleteNewsArticle } from '../../../../../lib/db'


export async function PUT(request, { params }) {
  const { id: rawId } = await params
  const id = parseInt(rawId)
  const body = await request.json()
  const updated = await updateNewsArticle(id, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(request, { params }) {
  const { id: rawId } = await params
  const id = parseInt(rawId)
  const ok = await deleteNewsArticle(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
