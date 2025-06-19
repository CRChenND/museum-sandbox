<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// OPTIONS 预检请求快速返回
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $logEntry = [
        'timestamp' => date("Y-m-d H:i:s"),
        'userId' => $data['userId'] ?? 'unknown',
        'event' => $data['event'] ?? 'unknown',
        'element' => $data['element'] ?? '',
        'step' => $data['step'] ?? '',
        'character' => $data['character'] ?? '',
        'extra' => $data['extra'] ?? []
    ];

    $logFile = 'click_log.json';

    // 如果文件已存在，加载已有数据；否则创建新数组
    if (file_exists($logFile)) {
        $logs = json_decode(file_get_contents($logFile), true);
        if (!is_array($logs)) $logs = [];
    } else {
        $logs = [];
    }

    $logs[] = $logEntry;

    // 保存整个数组回文件
    file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success']);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
