export interface GoogleFormEmbedProps {
  formUrl: string;
  width?: string;
  height?: string;
}

export const GoogleFormEmbed: React.FC<GoogleFormEmbedProps> = ({
  formUrl,
}) => {
  return (
    <iframe
      allowFullScreen={true}
      src={formUrl}
      width="100%"
      height="100%" // Altura dinámica
      style={{ border: "none" }}
      title="Google Form"
    >
      Cargando…
    </iframe>
  );
};
