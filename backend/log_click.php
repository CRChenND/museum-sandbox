<?php
// ✅ 开启错误显示（调试阶段使用，上线后应删除）
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ✅ 写入 debug 日志：每次访问都会记录时间
file_put_contents(
    $_SERVER['HOME'] . "/logs/php_debug.log",
    date("Y-m-d H:i:s") . " - PHP script hit\n",
    FILE_APPEND
);

// ✅ 设置 CORS 头，支持跨域请求
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ✅ 预检请求快速返回
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// ✅ 从请求体中读取 JSON 数据
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // ✅ 构造日志条目
    $logEntry = [
        'timestamp' => date("Y-m-d H:i:s"),
        'userId' => $data['userId'] ?? 'unknown',
        'event' => $data['event'] ?? 'unknown',
        'element' => $data['element'] ?? '',
        'step' => $data['step'] ?? '',
        'character' => $data['character'] ?? '',
        'extra' => $data['extra'] ?? []
    ];

    // ✅ 设置日志目录和文件
    $logDir = $_SERVER['HOME'] . "/logs";
    $logFile = $logDir . "/log.json";

    // ✅ 如果目录不存在则创建
    if (!is_dir($logDir)) {
        mkdir($logDir, 0700, true);
    }

    // ✅ 读取已有日志
    if (file_exists($logFile)) {
        $logs = json_decode(file_get_contents($logFile), true);
        if (!is_array($logs)) $logs = [];
    } else {
        $logs = [];
    }

    // ✅ 添加新日志条目
    $logs[] = $logEntry;

    // ✅ 写回日志文件（格式化）
    file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT));

    // ✅ 返回成功 JSON 响应
    echo json_encode([
        'status' => 'success',
        'message' => 'PHP executed correctly'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid or empty JSON payload'
    ]);
}
