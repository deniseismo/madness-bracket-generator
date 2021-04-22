import json
from nanoid import generate
from madnessbracket.models import BracketData
from madnessbracket import db
from madnessbracket import cache


@cache.memoize(timeout=3600)
def save_bracket_to_database(shared_bracket_data):
    """saves user's bracket & all its info/data to the database

    Args:
        shared_bracket_data (dict): a validated (via pydantic) bracket dict-like structure

    Returns:
        (str) bracket unique id for further sharing
    """
    # generate unique id for saving & sharing
    bracket_id = generate(size=13)
    # prepare bracket data
    bracket_type = shared_bracket_data["bracket_type"]
    title = shared_bracket_data["title"]
    bracket_info = shared_bracket_data["bracket_info"]
    bracket_info = json.dumps(bracket_info)
    bracket_entry = BracketData(bracket_id=bracket_id,
                                bracket_type=bracket_type,
                                title=title,
                                bracket_info=bracket_info)
    # check if bracket has a winner, save if true
    if shared_bracket_data["winner"]:
        winner = shared_bracket_data["winner"]
        bracket_entry.winner = winner
    db.session.add(bracket_entry)
    db.session.commit()
    return bracket_id


def get_bracket_from_database(bracket_id):
    """gets shared bracket info from db

    Args:
        bracket_id (str): bracket's unique id

    Returns:
        [type]: [description]
    """
    bracket = BracketData.query.filter_by(bracket_id=bracket_id).first()
    if not bracket:
        return None
    bracket_structure = json.loads(bracket.bracket_info)
    bracket_description = {
        "bracket_type": bracket.bracket_type,
        "description": bracket.title
    }
    bracket_data = bracket_description | bracket_structure

    return bracket_data
