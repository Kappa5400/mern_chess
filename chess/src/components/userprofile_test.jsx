import React from "react";
import { Profile } from "./profile.jsx";

export function UserProfile() {
  const user = {
    name: "Test",
    avatar_url:
      "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdXB3azYyMDQ3NzczLXdpa2ltZWRpYS1pbWFnZS1qb2I2MjEta3pycm44YngucG5n.png",
  };

  return <Profile {...user} />;
}
