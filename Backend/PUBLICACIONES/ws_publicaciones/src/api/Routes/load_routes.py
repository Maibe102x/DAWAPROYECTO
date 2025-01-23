from ..Services.post_create_service import PostCreateService
from ..Services.post_delete_service import PostDeleteService
from ..Services.post_like_service import PostLikeService
from ..Services.post_service import PostService
from ..Services.post_list_service import PostListService
from ..Services.post_update_service import PostUpdateService

def load_routes(api):
    api.add_resource(PostCreateService, '/posts/create')#POST
    api.add_resource(PostDeleteService, '/posts/delete/<int:post_id>')#DELETE
    api.add_resource(PostLikeService, '/posts/like')#GET
    api.add_resource(PostService, '/posts/<string:u_login>/<int:post_id>')#GET
    api.add_resource(PostListService, '/posts/list')#GET
    api.add_resource(PostUpdateService, '/posts/update/<int:post_id>')#PUT

