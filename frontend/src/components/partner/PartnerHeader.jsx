export default function PartnerHeader({ title, subtitle, actionButton }) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
      {actionButton && actionButton}
    </div>
  );
}
