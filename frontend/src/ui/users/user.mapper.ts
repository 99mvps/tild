import { ListMapper } from "domain/mapper";
import { UserDTO, UserMUIDropDownListDTO } from "./user.interfaces";

/**
 * A mapper to transform the value received from a source, into a DropDown list.
 * specifically to MUI Material UI dropdown list
 * @param user user data fetched
 * @returns {DoctorDropDownListDTO} the dropdown user list
 */
function MapperUserDropDownList(user: UserDTO): UserMUIDropDownListDTO {
  return {
    id: user.id,
    label: user.name,
  };
}
export const mapUserDropDownList = ListMapper(MapperUserDropDownList);
