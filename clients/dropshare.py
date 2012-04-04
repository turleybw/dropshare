#!/usr/bin/python
import sys
import os
import json
import mimetypes

HOST="http://api.dropsha.re"

def upload(f):
   name = f.name.replace(' ', '_')
   
   attr = {}
   attr["size"] = os.path.getsize(name)
   attr["lastModifiedDate"] = os.path.getmtime(name)
   attr["filename"] = name 
   attr["type"] = mimetypes.guess_type(name)[1]
   attr["path"] = os.path.abspath(name) 
   
   header = "Content-Type: application/json"
   
   cmd = "curl --silent %s/files/new -X POST -H \"%s\" -d \'[%s]\'"\
      % (HOST, header, json.dumps(attr))
   result = os.popen(cmd).readline()
   #ex ["pQC+dgA"]
   result = result[2:-2]
   print "Uploading to %s/files/%s/%s" % (HOST, result, name)
   
   cmd = "curl --silent --progress-bar %s/files -X POST \
   --form %s=\'@%s\'" % (HOST, result, name)
   os.popen(cmd).readline()
   
   print "Your file, Sir! (or Ma'am):\n"
   print "http://dropsha.re/#%s\n" % (result)
   print "wget 'http://api.dropsha.re/files/%s/%s'\n" % (result, name)
   print "curl 'http://api.dropsha.re/files/%s' -o '%s'\n" % (result, name)
   print "dropshare-get %s" % (result)   
   
def main():
   try:
      with open(sys.argv[1]) as infile:
         upload(infile)
   except IOError as e:
      print 'file does not exist'   
      
if __name__ == "__main__":
   main()
