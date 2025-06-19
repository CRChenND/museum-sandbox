// src/utils/logger.js
export async function logClick(event, element, step, character, extra = {}) {
  const userId = localStorage.getItem("userId"); // 从本地读取用户唯一标识

  try {
    await fetch("http://localhost:8000/log_click.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, element, step, character, extra, userId }),
    });
  } catch (err) {
    console.error("Click log failed:", err);
  }
}