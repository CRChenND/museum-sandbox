export async function logClick(event, element, step, character, extra = {}) {
  const {
    userId = localStorage.getItem('sessionId') || 'unknown',
    ...restExtra
  } = extra;

  try {
    await fetch("http://localhost:8000/log_click.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        element,
        step,
        character,
        userId,         // ✅ 单独写入 userId
        extra: restExtra  // ✅ 把其余 extra 放到 extra 字段
      }),
    });
  } catch (err) {
    console.error("Click log failed:", err);
  }
}
