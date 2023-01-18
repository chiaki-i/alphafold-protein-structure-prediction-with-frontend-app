import { useLocation, Link } from 'react-router-dom'
import { ReactNode } from 'react'
import { Drawer, Box, AppBar, List, Typography, Grid, Container, Paper, Button } from '@mui/material'
import { Folder as FolderIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material/'
import reactLogo from '../assets/react.svg'

const TOP_BAR_HEIGHT: number = 50
const SIDE_BAR_WIDTH: number = 250

export const baseColor = (alpha = 1, rgb = [45, 50, 55]) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`
export const baseInvertColor = (alpha = 1, rgb = [255, 255, 255]) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`

const sideMenuButtonStyle = {
  margin: '0 0.5em 0.25em 0.5em',
  backgroundColor: baseColor(),
  color: baseInvertColor(0.5),
  width: `calc(100% - 1em)`,
  justifyContent: 'flex-start',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: baseInvertColor(0.1),
    color: baseInvertColor(0.8),
    boxShadow: 'none'
  }
}

export const Layout = ({ children, appBarRender }: { children: ReactNode; appBarRender: () => ReactNode }) => {
  const location = useLocation()

  const sideBarItems = [
    { href: '/alphafold2', match: /^\/alphafold2/, title: 'alphafold2', icon: FolderIcon },
    { href: '/colabfold', match: /^\/colabfold/, title: 'colabfold', icon: FolderIcon }
  ]

  return (
    <>
      {/* ヘッダー */}
      <AppBar
        sx={{
          width: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
          height: TOP_BAR_HEIGHT,
          backgroundColor: 'white',
          borderBottom: `1px solid ${baseColor(0.1)}`,
          justifyContent: 'center',
          boxShadow: 'none'
        }}
      >
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>{appBarRender()}</Grid>
        </Grid>
      </AppBar>

      {/* サイドバー */}
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: `${SIDE_BAR_WIDTH}px`,
            backgroundColor: baseColor()
          }
        }}
      >
        {/* サービスアイコン */}
        <Grid container direction="row" padding={2}>
          <Grid item component={Link} to="/">
            <img src={reactLogo} />
          </Grid>
          <Grid item paddingLeft={1}>
            <Typography component={Link} to="/" variant="h6" color="white" sx={{ textDecoration: 'none' }}>
              AWS SAMPLE
            </Typography>
          </Grid>
        </Grid>

        {/* サイドバーのメニューリスト */}
        <List component="nav">
          {sideBarItems.map((sideBarItem) => {
            return (
              <Link to={sideBarItem.href} key={sideBarItem.href} style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  startIcon={<sideBarItem.icon />}
                  sx={
                    sideBarItem.match.test(location.pathname)
                      ? { ...sideMenuButtonStyle, ...sideMenuButtonStyle['&:hover'] }
                      : { ...sideMenuButtonStyle }
                  }
                >
                  {sideBarItem.title}
                </Button>
              </Link>
            )
          })}
        </List>
      </Drawer>

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          pt: `${TOP_BAR_HEIGHT}px`,
          pl: `${SIDE_BAR_WIDTH}px`
        }}
      >
        <Container sx={{ mt: 2, mb: 3 }}>{children}</Container>
      </Box>
    </>
  )
}

export default Layout
