import pytest
from unittest.mock import AsyncMock, MagicMock


@pytest.fixture(autouse=True)
def mock_lifespan(monkeypatch):
    """Mock the lifespan context manager to avoid Redis connection during tests"""

    async def mock_lifespan_func(app):
        # Mock Redis
        app.state.redis = AsyncMock()
        yield
        # Cleanup

    monkeypatch.setattr("main.lifespan", mock_lifespan_func)
