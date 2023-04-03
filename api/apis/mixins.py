from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class AuthMixin(APIView):
    permission_classes = [IsAuthenticated]

    def _return_exception_response(self, exception, request):
        return Response(
            dict(
                error=True,
                success=False,
                payload=request.data,
                message=exception.message,
            ),
            status=exception.status_code,
        )
