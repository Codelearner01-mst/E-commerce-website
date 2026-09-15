from . import auth_bp


@auth_bp.get("/health")
def auth_health():
    return {"blueprint": "auth", "status": "ok"}
