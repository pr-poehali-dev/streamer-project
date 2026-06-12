import json
import os
import urllib.parse
import pg8000.native


def handler(event: dict, context) -> dict:
    """Возвращает список топ-донатеров из БД, отсортированных по сумме."""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    dsn = os.environ["DATABASE_URL"]
    parsed = urllib.parse.urlparse(dsn)

    conn = pg8000.native.Connection(
        user=urllib.parse.unquote(parsed.username),
        password=urllib.parse.unquote(parsed.password),
        host=parsed.hostname,
        port=parsed.port or 5432,
        database=parsed.path.lstrip("/"),
    )

    rows = conn.run(
        "SELECT name, amount, avatar FROM donors ORDER BY amount DESC LIMIT 20"
    )
    conn.close()

    donors = [
        {"name": row[0], "amount": row[1], "avatar": row[2]}
        for row in rows
    ]

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"donors": donors}, ensure_ascii=False),
    }