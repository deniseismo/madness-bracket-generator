from pydantic import BaseModel, ValidationError, NoneStr, Field, validator, constr


def validate_bracket_upper_limit(upper_limit: str):
    """validate user's input: bracket upper limit

    Args:
        upper_limit (number-like str): bracket's upper limit

    Raises:
        ValueError: Incorrect Upper Limit

    Returns:
        validated upper limit or False if invalid
    """
    class BracketUpperLimit(BaseModel):
        """madness bracket upper limit (max number of tracks)
        """
        upper_limit: int

        @validator("upper_limit", allow_reuse=True)
        def check_upper_limit(cls, v):
            if v not in [4, 8, 16, 32]:
                raise ValueError("incorrect upper_limit")
            return v

    try:
        user_input = BracketUpperLimit(upper_limit=upper_limit)
        print('user input correct')
        print(user_input.upper_limit, type(user_input.upper_limit))
        return user_input
    except ValidationError as e:
        print(e.json())
        return False


def validate_artist_name(artist_name: str):
    """validate user's input: artist's name

    Args:
        upper_limit (str): artist's name

    Raises:
        ValueError: Invalid Length

    Returns:
        validated artist's name or False if invalid
    """
    class ArtistName(BaseModel):
        """artist's name
        """
        artist_name: constr(min_length=1, max_length=100)

    try:
        user_input = ArtistName(artist_name=artist_name)
        print('user input correct')
        return user_input
    except ValidationError as e:
        print(e.json())
        return False