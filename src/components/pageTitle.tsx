interface PageTitleProps {
    title: string
    subtitle: string
}

const PageTitle = ({ title, subtitle } : PageTitleProps) => {
    return (
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm sm:text-base">{subtitle}</p>
      </div>
    );
}
 
export default PageTitle;