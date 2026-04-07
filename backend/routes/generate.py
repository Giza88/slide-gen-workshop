from io import BytesIO

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from services.pptx_engine import build_presentation

router = APIRouter()

PPTX_MEDIA_TYPE = (
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
)


class SlideRequest(BaseModel):
    prompt: str
    slide_count: int = 5
    theme: str = "default"


@router.post("/generate")
async def generate_slides(req: SlideRequest):
    slides_data = [
        {
            "title": f"Slide {i + 1}: {req.prompt}",
            "bullets": ["Key point", "Another point", "Third point"],
        }
        for i in range(req.slide_count)
    ]
    pptx_bytes = build_presentation(slides_data)
    return StreamingResponse(
        BytesIO(pptx_bytes),
        media_type=PPTX_MEDIA_TYPE,
        headers={"Content-Disposition": 'attachment; filename="slides.pptx"'},
    )
