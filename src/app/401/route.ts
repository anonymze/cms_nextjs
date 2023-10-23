export function GET() {
    return Response.json({
        "status": 401,
        "message": "Route non autorisé"
    });
}