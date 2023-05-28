import { ListMapper, MUIDropDownList } from "domain/mapper";
import { UserDTO } from "./user.interfaces";

/**
 * A mapper to transform the value received from a source, into a DropDown list.
 * specifically to MUI Material UI dropdown list
 * @param user user data fetched
 * @returns {MUIDropDownList} the dropdown user list
 */
function MapperUserDropDownList(user: UserDTO): MUIDropDownList {
  return {
    id: user.id,
    label: user.name,
  };
}
export const mapUserDropDownList = ListMapper(MapperUserDropDownList);
