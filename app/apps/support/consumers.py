from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async

from .models import Thread


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def websocket_connect(self, event):
        thread_id = self.scope["url_route"]["kwargs"]["thread"]
        await self.channel_layer.group_add(
            f"thread_{thread_id}",
            self.channel_name
        )

        await self.accept()

        await self.send_json(content={})

    async def websocket_receive(self, event):
        # Not Required - We won't receive sth. from user
        pass

    async def websocket_disconnect(self, event):
        pass

    async def send_message(self, event):
        # triggered from post save signal
        await self.send_json(content=event["context"])

    @database_sync_to_async
    def get_thread(self, id):
        # Not required anymore. Just here for documentation
        return Thread.objects.get(id=id)
