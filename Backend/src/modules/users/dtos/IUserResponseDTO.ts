export default interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  active: boolean;
  is_admin: boolean;
  created_at: Date;
}
