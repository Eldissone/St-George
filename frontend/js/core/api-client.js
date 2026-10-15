export async function api(path, options = {}) {
  const response = await fetch(`/api/v1${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || 'Não foi possível concluir o pedido.');
  return payload.data;
}
