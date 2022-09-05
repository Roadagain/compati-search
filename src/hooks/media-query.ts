import { useMediaQuery, useTheme } from "@mui/material"

export const useIsTabletOrDesktop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('sm'))
}
