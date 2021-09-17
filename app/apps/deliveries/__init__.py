from abc import ABC, abstractmethod
from . import sample
from . import video

DELIVERIES = [sample, video]


class DeliveryDescription(ABC):
    @abstractmethod
    def run(self, *args, **kwargs): ...
