#include "SwissEphGlue.h"
#include "string.h"


void _SEGDataFilesCopyPathForFile(char *datapath, const char *fname, const char *ephepath) {
  strcpy(datapath, ephepath);
}

void _SEGDataFilesCopyFrameworkPath(char *ephepath,  char *empty){
  strcpy(ephepath, empty);
}
