interface LoadingProps {
  fullScreen?: boolean;
}

export default function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : 'min-h-[200px]'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
} 