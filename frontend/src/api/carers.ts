export async function createCarer(formData: any, idToken: any) {
  const res = await fetch('/carers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`
    },
    body: formData
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return await res.json();
}
