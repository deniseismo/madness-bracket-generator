from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from madnessbracket.config import Config
from sqlalchemy import MetaData


my_naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
mtd = MetaData(naming_convention=my_naming_convention)

db = SQLAlchemy(metadata=mtd)


def create_app(config_class=Config):
    """
    creates an instance of an app
    :param config_class: Config class file with all the configuration
    :return: app
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # import all necessary blueprints
    from madnessbracket.main.routes import main
    from madnessbracket.spotify_api.routes import spotify
    # register all blueprints
    app.register_blueprint(main)
    app.register_blueprint(spotify)

    return app
