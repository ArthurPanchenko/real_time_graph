import random, json

from asyncio import sleep

from channels.generic.websocket import AsyncWebsocketConsumer


def gen_month():
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    index = 0

    while True:
        yield months[index]

        index += 1
        if index > 11:
            index = 0


class GraphConsumer(AsyncWebsocketConsumer):
    def __init__(self):
        super().__init__()
        self.month_gen = gen_month()

    async def connect(self):

        await self.accept()

        for i in range(1000):
            month = next(self.month_gen)
            await self.send(
                json.dumps({
                    'value': random.randint(1, 100),
                    'month': month
                })
            )
            await sleep(1)
