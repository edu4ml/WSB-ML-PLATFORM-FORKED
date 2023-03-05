from pydantic import BaseModel

class ExerciseRequiredEvaluation(BaseModel):
    type: str
    passed: bool 
    
    def __init__(self, type, **kwargs):
        kwargs['type'] = type
        kwargs['passed'] = self._calculate_is_passed()
        
        super().__init__(**kwargs)
        
    def _calculate_is_passed(self):
        return True