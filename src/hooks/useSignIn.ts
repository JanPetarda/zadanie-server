import { useMutation } from "react-query"

const signIn = async () => {
    const response = await fetch('http://localhost:3001/api/admin/signin', {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  
    return response.json();
  };
  

export const useSignIn = () => {
    const mutation = useMutation(signIn);
    return mutation;
}