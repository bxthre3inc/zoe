import httpx
import time
import logging

class BaseSimulator:
    def __init__(self, hardware_id: str, field_id: str, backend_url: str):
        self.hardware_id = hardware_id
        self.field_id = field_id
        self.backend_url = backend_url
        self.client = httpx.AsyncClient(base_url=self.backend_url)
        self.logger = logging.getLogger(self.__class__.__name__)
        self.is_broken = False # For Chaos Engineering

    async def emit(self):
        raise NotImplementedError("Each simulator must implement the emit method")

    def break_hardware(self):
        self.logger.warning(f"Hardware {self.hardware_id} broke!")
        self.is_broken = True

    def fix_hardware(self):
        self.logger.info(f"Hardware {self.hardware_id} fixed.")
        self.is_broken = False
