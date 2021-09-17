
def get_initial_instructions():
    description = """
        This is a sample delivery which is shown on path /sample or any path which does not exist yet.
        Just Copy a Text from Twitter by Elon Musk, Donald Trump, Joe Biden or Kim Kardashian.
        The Program will try to detect the person who posted that tweet.
    """
    return {"description": description}


def receive_request(msg):
    return {"data": "This is fun!"}
