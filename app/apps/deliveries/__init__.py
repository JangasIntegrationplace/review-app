from abc import ABC, abstractmethod
from . import sample


DELIVERIES = [sample]


class DeliveryDescription(ABC):
    @abstractmethod
    def run(self, *args, **kwargs): ...
