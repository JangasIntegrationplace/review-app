import os
from random import randint

DELIVERY_DIR = os.getcwd()


def get_initial_instructions():
    description = """
        This is for a Video. Call me how you ve liked it.
    """
    return {"description": description}


def receive_request(msg):

    return {
        "input": msg,
        "output": {"random integer": randint(1, 1000)}
    }
