from ..Services.login_service import LoginService
from ..Services.logout_service import LogoutService
from ..Services.register_service import  RegisterService
from ..Services.reset_password_service import ResetPasswordService

def load_routes(api):
    api.add_resource(LoginService, '/user/login')
    api.add_resource(RegisterService, '/user/register')
    api.add_resource(LogoutService, '/user/logout')
    api.add_resource(ResetPasswordService, '/user/reset-password')