const LivePulseIcon = ({ size = 12, color = "bg-blue-500" }) => {
  return (
    <span
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Wave */}
      <span
        className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-70 animate-ping`}
      ></span>

      {/* Center Dot */}
      <span
        className={`relative inline-flex rounded-full ${color}`}
        style={{ width: size, height: size }}
      ></span>
    </span>
  );
};

export default LivePulseIcon;
