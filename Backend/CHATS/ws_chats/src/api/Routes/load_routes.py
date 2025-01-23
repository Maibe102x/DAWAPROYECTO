from ..Services.create_chat_service import ChatCreateService
from ..Services.create_message_service import MessageCreateService
from ..Services.delete_message_service import DeleteMessageService
from ..Services.get_chat_list import ChatListService
from ..Services.get_chat  import ChatUserService
from ..Services.get_chat_created import ChatCreated

def load_routes(api):
    api.add_resource(ChatCreateService,'/chat/conversations')
    api.add_resource(MessageCreateService, '/chat/conversations/<int:chat_id>/messages')
    api.add_resource(DeleteMessageService, '/chat/conversations/delete/<int:message_id>/messages')
    api.add_resource(ChatListService, '/chat/<string:user>/list')
    api.add_resource(ChatUserService, '/chat/user/conversations/<int:chat_id>')
    api.add_resource(ChatCreated, '/chat/created/<int:user_1>/<int:user_2>')
