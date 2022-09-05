import { Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

export const useIsTabletOrDesktop = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
}
