from ..Services.user_update_service import UpdateUserService
from ..Services.user_service import UserService
from ..Services.user_upload_photo_service import UploadPhotoService
from ..Services.user_service_username import UserServiceUsername
from ..Services.user_search_service import UserSearch

def load_routes(api):
    api.add_resource(UserService,'/user/data/<int:user_id>')
    api.add_resource(UserServiceUsername, '/user/data/username/<string:u_login>')
    api.add_resource(UpdateUserService, '/user/update/data/<int:user_id>')
    api.add_resource(UploadPhotoService, '/user/update/photo/<int:user_id>')
    api.add_resource(UserSearch, '/user/search')