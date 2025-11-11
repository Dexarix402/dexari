import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AgentAvatarProps {
  address: string;
  name?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function AgentAvatar({ address, name, imageUrl, size = "md" }: AgentAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const getInitials = () => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return address.slice(0, 2).toUpperCase();
  };

  const getGradient = () => {
    const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 60) % 360}, 70%, 40%))`;
  };

  return (
    <Avatar className={sizeClasses[size]}>
      {imageUrl ? (
        <AvatarImage src={imageUrl} alt={name || address} />
      ) : null}
      <AvatarFallback style={{ background: getGradient() }} className="text-white font-semibold">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
}
