import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
interface PageTypes {
  id: number;
  pageName: string;
  href: string;
  target?:string
}
const pages: PageTypes[] = [
  {
    id: 0,
    pageName: "Ana Sayfa",
    href: "/",
  },
  {
    id: 1,
    pageName: "Hakkımızda",
    href: "/aboutus",
  },
  {
    id: 2,
    pageName: "Bize Ulaşın",
    href: "https://mcetinportfolio.netlify.app/",
    target:"_blank"
  },
];

function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const router = useRouter();
  return (
    <header>
      <AppBar position="static" sx={{ background: "#F108A4" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Image width={90} height={90} alt="logo" src={"/assets/logo.png"} />

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon style={{ fill: "white" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <nav>
                  {pages.map((page) => (
                    <Link
                      href={page.href}
                      key={page.id}
                      style={{ color: "black" }}
                    >
                      <MenuItem
                        key={page.id}
                        onClick={handleCloseNavMenu}
                        sx={{ paddingX: 2 }}
                      >
                        <Typography textAlign="center">
                          {page.pageName}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </nav>
              </Menu>
            </Box>

            <nav>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page,i) => (
                  <Link href={page.href} target={page.target} key={page.id} className={router.pathname == page.href  ? "nav-link" : ""}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "whitesmoke",
                        display: "block",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      {page.pageName}
                    </Button>
                  </Link>
                ))}
              </Box>
            </nav>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
export default NavigationBar;
