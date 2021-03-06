from madnessbracket.battle.prepare_tracks import prepare_tracks_for_artist_battle
from madnessbracket.musician.musician_handlers import get_artists_tracks


def get_artists_battle(artist_name: str, artist_name_2: str, bracket_limit: int):
    """
    get tracks for ARTIST BATTLE: ARTIST 1 vs ARTIST 2 (e.g. Radiohead vs Muse)
    :param artist_name: first artist's name
    :param artist_name_2: second artist's name
    :param bracket_limit: chosen bracket upper limit
    :return:
    """
    if not artist_name or not artist_name_2 or not bracket_limit:
        return None
    artist_1_tracks = get_artists_tracks(artist_name, bracket_limit)
    if not artist_1_tracks:
        print(f"could not find tracks for {artist_name}")
        return None
    artist_2_tracks = get_artists_tracks(artist_name_2, bracket_limit)
    if not artist_2_tracks:
        print(f"could not find tracks for {artist_name_2}")
        return None
    battle_tracks = prepare_tracks_for_artist_battle(
        artist_1_tracks, artist_2_tracks, bracket_limit)
    artist_1_corrected_name = artist_1_tracks[0]["artist_name"]
    artist_2_corrected_name = artist_2_tracks[0]["artist_name"]
    description = f"{artist_1_corrected_name.upper()} vs {artist_2_corrected_name.upper()}"
    if artist_1_corrected_name == artist_2_corrected_name:
        description += ": An Internal Conflict"
    tracks = {
        "tracks": battle_tracks,
        "description": description,
        "value1": artist_1_corrected_name,
        "value2": artist_2_corrected_name,
        "extra": "artists_battle"
    }
    return tracks
