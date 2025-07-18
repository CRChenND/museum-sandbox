// logger.js

// 全局初始化日志数组（防止重复定义）
if (!window.clickLogs) {
  window.clickLogs = [];
}

/**
 * 记录一次用户点击事件
 * @param {string} event - 事件名称，如 'share'、'reset'
 * @param {string} element - 被点击的元素 ID 或说明
 * @param {string|number} step - 当前步骤编号
 * @param {string} character - 当前角色（如 "Mateo"）
 * @param {object} extra - 其他额外信息（如选择项等）
 */
export function logClick(event, element, step, character, extra = {}) {
  const {
    userId = localStorage.getItem('sessionId') || 'unknown',
    ...restExtra
  } = extra;

  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    element,
    step,
    character,
    userId,
    extra: restExtra,
  };

  window.clickLogs.push(logEntry);

  console.log("✅ logClick stored:", logEntry);
}

/**
 * 触发浏览器下载 log.json 文件
 */
export function downloadLogs() {
  if (!window.clickLogs || window.clickLogs.length === 0) {
    alert("No logs to download.");
    return;
  }

  const jsonStr = JSON.stringify(window.clickLogs, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "log.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log("📥 Logs downloaded.");
}

/**
 * 清空所有前端已记录的点击日志
 */
export function resetLogs() {
  window.clickLogs = [];
  console.log("🗑️ clickLogs has been reset.");
}


// export async function logClick(event, element, step, character, extra = {}) {
//   const {
//     userId = localStorage.getItem('sessionId') || 'unknown',
//     ...restExtra
//   } = extra;

//   try {
//     await fetch("api/log_click.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         event,
//         element,
//         step,
//         character,
//         userId,         // ✅ 单独写入 userId
//         extra: restExtra  // ✅ 把其余 extra 放到 extra 字段
//       }),
//     });
//   } catch (err) {
//     console.error("Click log failed:", err);
//   }
// }
