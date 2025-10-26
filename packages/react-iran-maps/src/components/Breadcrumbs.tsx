interface BreadcrumbsProps {
  selectedProvince: string;
  handleBack: () => void;
}

export function Breadcrumbs({
  selectedProvince,
  handleBack,
}: BreadcrumbsProps) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#199DA3",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: "700",
          direction: "rtl",
        }}
      >
        <span onClick={handleBack} style={{ cursor: "pointer" }}>
          ایران
        </span>
        {">"}
        {selectedProvince && (
          <span
            style={{
              color: "#9CAEBB",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "700",
            }}
          >
            {selectedProvince}
          </span>
        )}
      </div>
    </>
  );
}
