
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, InputProps } from "./Input";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative w-full">
        <Input
          {...props}
          type={visible ? "text" : "password"}
          className={`pr-10 ${props.className || ""}`}
          ref={ref}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c87941] hover:text-[#a05e2f] transition-colors focus:outline-none"
        >
          {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
